import subprocess
import importlib

def install_and_import(package):
    try:
        importlib.import_module(package)
        print(f"{package} já está instalado.")
    except ImportError:
        print(f"Instalando {package}...")
        subprocess.run(["pip", "install", package])
if __name__ == "__main__":
    packages = ["flask", "flask_cors", "flask_login", "mysql", "mysql-connector", "bcrypt"]
    for package in packages:
        install_and_import(package)    