import os
import subprocess

def setup_google_drive_credentials():
    script_directory = os.path.dirname(__file__)
    credentials_path = os.path.join(script_directory, '..', 'credenciales', 'client_secrets.json')
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = credentials_path

def run_google_drive_manager():
    script_directory = os.path.dirname(__file__)
    subprocess.run(['python', os.path.join(script_directory, 'google_drive_manager.py')])

if __name__ == "__main__":
    setup_google_drive_credentials()
    run_google_drive_manager()
