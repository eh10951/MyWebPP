#!/usr/bin/env python3
# test_api.py - Script para probar la API localmente antes de desplegar

import requests
import json
import sys

def test_local_api():
    """Prueba la API local en localhost:5000"""
    
    url = "http://localhost:5000"
    
    print("🧪 PROBANDO API LOCAL")
    print("=" * 50)
    
    # Prueba 1: Health Check
    try:
        print("📡 1. Probando health check...")
        response = requests.get(f"{url}/", timeout=5)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Health check OK: {data['message']}")
        else:
            print(f"❌ Health check falló: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error conectando al servidor: {e}")
        print("💡 Asegúrate de ejecutar 'python backend/app.py' primero")
        return False
    
    # Prueba 2: Clasificación de texto
    try:
        print("📝 2. Probando clasificación de texto...")
        
        test_cases = [
            "Me siento muy desmotivado con mis estudios",
            "Me encanta estudiar matemáticas",
            "Necesito ayuda con programación",
            "Quiero abandonar la universidad"
        ]
        
        for i, texto in enumerate(test_cases):
            print(f"   Caso {i+1}: '{texto}'")
            
            response = requests.post(f"{url}/clasificar", 
                json={"texto": texto},
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                print(f"   ✅ Categoría: {data['categoria']}")
                print(f"   📊 Confianza: {data['confianza']}")
            else:
                print(f"   ❌ Error: {response.status_code}")
                print(f"   📄 Respuesta: {response.text}")
                return False
                
    except Exception as e:
        print(f"❌ Error en clasificación: {e}")
        return False
    
    print("\n🎉 ¡TODAS LAS PRUEBAS PASARON!")
    print("✅ Tu API está lista para desplegar en Railway")
    return True

def test_railway_api():
    """Prueba la API desplegada en Railway"""
    
    # Actualizar esta URL después del despliegue
    railway_url = "https://mywebpp-production.up.railway.app"
    
    print("🚀 PROBANDO API EN RAILWAY")
    print("=" * 50)
    
    try:
        print(f"📡 Probando: {railway_url}")
        response = requests.get(f"{railway_url}/", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Railway API OK: {data['message']}")
            return True
        else:
            print(f"❌ Railway API falló: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Error conectando a Railway: {e}")
        return False

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "railway":
        test_railway_api()
    else:
        print("Uso:")
        print("  python test_api.py        # Probar API local")
        print("  python test_api.py railway # Probar API en Railway")
        print()
        
        if input("¿Probar API local? (y/n): ").lower() == 'y':
            test_local_api()