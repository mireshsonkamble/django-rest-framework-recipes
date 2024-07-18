#!/bin/bash
# This script is intended for use in an Ubuntu Linux environment.
# It must be run with superuser (sudo) privileges.

# Variables
url_to_github_repo="https://github.com/mireshsonkamble/django-rest-framework-recipes.git"
local_repo=$(echo "$url_to_github_repo" | awk -F/ '{print $NF}' | awk 'split($1, a, "."){print a[1]}')
service_file_name="django.service"
path_to_service_file="/etc/systemd/system/$service_file_name"

# Set DEBIAN_FRONTEND to noninteractive to prevent prompts
export DEBIAN_FRONTEND=noninteractive

# Update the system
apt update -y
if [ "$?" -ne "0" ]; then
    echo "Error occurred while updating the system. Exiting..."
    exit 1
fi

# Install necessary Python packages
apt install python3 python3-pip python3-venv -y
if [ "$?" -ne "0" ]; then
    echo "Error occurred while installing Python packages. Exiting..."
    exit 2
fi

# Git clone the repository
git clone "$url_to_github_repo"
if [ "$?" -ne "0" ]; then
    echo "Error occurred while cloning the repository. Exiting..."
    exit 3
fi

# Change to the cloned repository directory
cd "$local_repo" || exit 4

# Initialize the Python virtual environment
python3 -m venv venv
source venv/bin/activate

# Install Django, Gunicorn, Django Rest Framework, and Django CORS Headers
pip install django gunicorn djangorestframework django-cors-headers
if [ "$?" -ne "0" ]; then
    echo "Error occurred while installing Django, Gunicorn, Django Rest Framework, and Django CORS Headers. Exiting..."
    exit 5
fi

# Find the project directory name containing "manage.py"
path_to_manage_py_file=$(find . -type f -name "manage.py")
project_dir=$(dirname "$path_to_manage_py_file")

# Change to the Django project directory
cd "$project_dir" || exit 6

# Path to settings.py file
path_to_settings_py_file="$project_dir/manage.py"

# Modify the "ALLOWED_HOSTS" line to include all hosts
sed -i "s/^ALLOWED_HOSTS = \[''\]$/ALLOWED_HOSTS = ['*']/" "$path_to_settings_py_file"

# Run Django migrations
echo "Running Django migrations..."
python manage.py migrate

# Obtain the absolute path to the Gunicorn binary and the current working directory
path_to_gunicorn_bin=$(which gunicorn)
working_dir=$(pwd)

# Create a "django.service" file at /etc/systemd/system/
cat > "$path_to_service_file" << EOF
[Unit]
Description=Django application server using Gunicorn
After=network.target

[Service]
User=ubuntu  # Replace with your Ubuntu user that owns the Django project
Group=www-data  # Replace with the appropriate group if needed
WorkingDirectory=$working_dir
ExecStart=$path_to_gunicorn_bin --workers 4 --bind=0.0.0.0:8000 $project_dir.wsgi:application
Restart=always

[Install]
WantedBy=multi-user.target
EOF

echo "Service file: $service_file_name has been created."

# Reload the systemd daemon
systemctl daemon-reload

# Start and enable the Django service to start at boot
if systemctl start $service_file_name; then
    echo "$service_file_name is started successfully."
else
    echo "Error occurred in starting $service_file_name. Exiting..."
    exit 7
fi

if systemctl enable $service_file_name; then
    echo "$service_file_name enabled successfully."
else
    echo "Error occurred in enabling $service_file_name. Exiting..."
    exit 8
fi

# Deactivate the virtual environment
deactivate

echo "Deployment and configuration completed successfully."
