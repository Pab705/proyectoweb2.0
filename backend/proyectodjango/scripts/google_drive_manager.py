from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive
import os

def authenticate_google_drive():
    gauth = GoogleAuth()
    gauth.LocalWebserverAuth()  # Esto abrirá una ventana del navegador para la autenticación
    drive = GoogleDrive(gauth)
    return drive

def list_files_in_folder(drive, folder_id):
    folder_files = drive.ListFile({'q': f"'{folder_id}' in parents and trashed=false"}).GetList()
    return folder_files

def download_file(drive, file_id, destination_path):
    file = drive.CreateFile({'id': file_id})
    file.GetContentFile(destination_path)

def main():
    drive = authenticate_google_drive()
    folder_id = 'your_folder_id'  # Reemplaza 'your_folder_id' con el ID real de tu carpeta en Google Drive
    files = list_files_in_folder(drive, folder_id)
    
    for file in files:
        print(f"Downloading {file['title']}...")
        download_file(drive, file['id'], os.path.join('descargas', file['DatosDrive']))

if __name__ == "__main__":
    main()
