# financial-risk

Financial Risk project repository for the EY technical interview

1. Se está utilizando un patrón de propagación hacia arriba de errores, para manejarlos en los controllers. Esto debido a que la "profundidad" de las llamadas no es tanta, por lo que trazar errores no será complejo y se evita llenar el código de try-catchs. Se maneja el error a nivel de función que controla la petición, no en las hijas.
2. La ruta de osl permite peticiones cada ciertos segundos. Sería bueno balancear eso
