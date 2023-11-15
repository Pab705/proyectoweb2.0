from django.core.management.base import BaseCommand
from scripts.google_drive_manager import main as download_google_drive_files

class Command(BaseCommand):
    help = 'Descarga archivos desde Google Drive'

    def handle(self, *args, **kwargs):
        download_google_drive_files()
        self.stdout.write(self.style.SUCCESS('Archivos descargados exitosamente'))
