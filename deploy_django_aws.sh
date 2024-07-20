#!/bin/bash
# This script is intended for use in an Ubuntu Linux environment.
# It must be run with superuser (sudo) privileges.

# Variables
url_to_github_repo="https://github.com/mireshsonkamble/django-rest-framework-recipes.git"
local_repo=$(echo "$url_to_github_repo" | awk -F/ '{print $NF}' | awk 'split($1, a, "."){print a[1]}')
#server_ip=$(ip addr show | grep inet | awk 'NR == 3 {print $2}' | awk 'split($1, a, "/") {print a[1]}')
service_file_name="django.service"
path_to_service_file=/etc/systemd/system/$service_file_name

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

# Change to the cloned repository directory
cd "$local_repo"

# Initialize the Python virtual environment
python3 -m venv venv

# Activate the virtual environment
source venv/bin/activate

# Install Django and Gunicorn
pip install django gunicorn djangorestframework django-cors-headers

# Find the project directory name containing "manage.py"
path_to_manage_py_file=$(find . -type f -name "manage.py")
project_dir=$(echo "$path_to_manage_py_file" | awk -F/ '{print $(NF - 1)}')

# Change to the Django project directory
cd "$project_dir"

# Find the path to the "settings.py" file from the current directory
path_to_setting_file=$(find . -type f -name "settings.py")

# Modify the "ALLOWED_HOSTS=['']" line to include the server IP
sed -i "s/^ALLOWED_HOSTS = \[''\]$/ALLOWED_HOSTS = ['*']/" "./assignment/settings.py"

# Run Django migrations
python manage.py migrate

# Obtain the absolute path to the Gunicorn binary and the current working directory
path_to_gunicorn_bin=$(which gunicorn)
working_dir=$(pwd)

# Create a "django.service" file at /etc/systemd/system/
cat > $path_to_service_file << EOF
[Unit]
Description=A service file for Django application server
After=network.target

[Service]
ExecStart=$path_to_gunicorn_bin --workers=4 --bind=0.0.0.0:8000 assignment.wsgi:application
Restart=always
WorkingDirectory=$working_dir

[Install]
WantedBy=multi-user.target
EOF

echo "Service file: $service_file_name has been created."

# Reload the systemd daemon
systemctl daemon-reload

# Start the Django service
if systemctl start $service_file_name; then
    echo "$service_file_name is started successfully."
else
    echo "Error occurred in starting $service_file_name. Exiting..."
    exit 3
fi

# Enable the Django service to start at boot
if systemctl enable $service_file_name; then
    echo "$service_file_name enabled successfully."
else
    echo "Error occurred in enabling $service_file_name. Exiting..."
    exit 4
fi

# Deactivate the virtual environment
echo "Deactivating the virtual environment"
deactivate
