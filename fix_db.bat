@echo off
echo ==========================================
echo      REPARANDO BASE DE DATOS SPEEDY
echo ==========================================

cd /d "%~dp0"

echo 1. Aplicando Estructura de Roles...
mysql -u root Speedy < backend\migrations\004_add_roles_auth.sql

echo 2. Reiniciando Usuarios (Cliente y Repartidor)...
mysql -u root Speedy < backend\migrations\006_reset_passwords.sql

echo 3. Forzando Compatibilidad (Nombre = Email)...
mysql -u root Speedy -e "UPDATE usuarios SET nombre = email;"

echo ==========================================
echo      LISTO. AGREGANDO COMPROBACION:
echo ==========================================
mysql -u root Speedy -e "SELECT id, nombre, email, password, rol FROM usuarios;"

echo.
echo SI VES LOS USUARIOS ARRIBA, INTENTA LOGUEARTE AHORA.
