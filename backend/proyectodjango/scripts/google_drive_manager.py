from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive
import os

def authenticate_google_drive():
    gauth = GoogleAuth()
    gauth.LocalWebserverAuth()  # Esto abrirá una ventana del navegador para la autenticación
    drive = GoogleDrive(gauth)
    print ("Autenticado correctamente")
    return drive

def list_files_in_folder(drive, folder_id):
    folder_files = drive.ListFile({'q': f"'{folder_id}' in parents and trashed=false"}).GetList()
    print("Servicio de verificación de archivos en la carpeta, cantidad de archivos: ",folder_files," id de carpeta: ",folder_id)
    return folder_files

def download_file(drive, file_id, destination_path):
    file = drive.CreateFile({'id': file_id})
    file.GetContentFile(destination_path)
    print("Archivo(s) descargados correctamente")

def main():
    drive = authenticate_google_drive()
    folder_id = '1rzQaGyDcRBko7-vKWSiqb86Gn0eHJ1xn'  #ID de carpeta en Google Drive
    files = list_files_in_folder(drive, folder_id)
    
    for file in files:
        print(f"Downloading {file['title']}...")
        download_file(drive, file['id'], os.path.join('Descargas', file['DatosDrive']))

if __name__ == "__main__":
    main()
