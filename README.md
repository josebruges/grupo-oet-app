# OET-Group-App

## Descargar APK

Flujo App [aquí](https://drive.google.com/file/d/14jNBpTyhK2YX4LtBDdnU0SCvnkXibdvT/view?usp=sharing).


## Requisitos para desplegar en local

1. **Angular CLI:** 16.2.0
2. **Node:** 20.11.0
3. **Package Manager (npm):** 9.6.7
4. **Java:** 8
5. **JDK:** 1.8
6. **Android Studio**
7. **Xcode:** para dispositivos Apple
8. **IDE de su preferencia (se recomienda Visual Studio Code)**

## Configurar variables de entorno

1. `JAVA_HOME=xxxxx`
2. `PATH=$JAVA_HOME/bin:$PATH`
3. `ANDROID_SDK_ROOT=xxxxx`
4. `PATH=${PATH}:$ANDROID_SDK_ROOT/tools:$ANDROID_SDK_ROOT/platform-tools:$ANDROID_SDK_ROOT/build-tools:$ANDROID_SDK_ROOT/platforms`

## Desplegar en local

### Navegador

Subir el servidor con `ionic serve`. Se desplegará en el puerto 8100.

### Android

1. Asegurarse de tener Android Studio instalado y configurado con un emulador.
2. Ejecutar el comando `npm run android:release`. Esto abrirá el emulador y ejecutará la aplicación.
3. Para hacer debugging, ingresar a Google Chrome y acceder a **chrome://inspect**.

## Para testing

1. Instalar dependencias: `npm i`
2. Crear plataforma de Android: `npm run create-platform:release`
3. Sincronizar app en plataforma Android: `npm run android:release`
4. Ingresar a la carpeta de Android: `cd android/`
5. Ejecutar el siguiente comando: `./gradlew assembleDebug`
6. Se generará el archivo APK en la siguiente ubicación: `android/app/build/outputs/apk/debug/app-debug.apk`


## Descargar APK

Puedes descargar la versión más reciente de la aplicación [aquí](https://drive.google.com/drive/folders/1mMlQgaW4u1o-VJpt-zNE-w1l_7fy464T?usp=sharing).