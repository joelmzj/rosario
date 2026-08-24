# 1. Definir carpeta de destino
$target = ".Notebook"
if (Test-Path $target) { Remove-Item -Recurse -Force $target }
New-Item -ItemType Directory -Path $target | Out-Null

# 2. Carpetas a ignorar y extensiones permitidas
$exclude = @('node_modules', 'dist', '.git', '.Notebook')
$allowedExts = @('.js', '.html', '.css', '.json', '.gitignore', '.config', '.md')

# 3. Empaquetar y renombrar dinámicamente
Get-ChildItem -Recurse -File | ForEach-Object {
    $relativePath = $_.FullName.Substring((Get-Location).Path.Length + 1)
    
    $skip = $false
    foreach ($dir in $exclude) {
        if ($relativePath.StartsWith($dir + "\") -or $relativePath -eq $dir) {
            $skip = $true
            break
        }
    }
    
    if (!$skip -and ($allowedExts -contains $_.Extension -or $_.Name -eq "vite.config.js")) {
        $flatName = $relativePath.Replace("\", "-").Replace("/", "-") + ".txt"
        $destPath = Join-Path $target $flatName
        Copy-Item $_.FullName -Destination $destPath -Force
    }
}

Write-Host "¡Felicidades! Tus archivos de diagnóstico están listos en la carpeta: .Notebook" -ForegroundColor Green