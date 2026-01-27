New-NetFirewallRule -DisplayName "Speedy App - NodeJS Port 3000" -Direction Inbound -LocalPort 3000 -Protocol TCP -Action Allow -Profile Any
Write-Host "Regla de Firewall agregada correctamente para el puerto 3000."
