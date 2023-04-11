function updateText(x, y, z) {
  const app = document.getElementsByClassName("App")[0];
  app.innerHTML = "";
  app.innerHTML = "X: " + x + "Y: " + y + "Z: " + z;
}

try {
  let gyroscope = new Gyroscope({ frequency: 60 });

  gyroscope.addEventListener("reading", (e) => {
    updateText(gyroscope.x, gyroscope.y, gyroscope.z);
    console.log(`Angular velocity along the X-axis ${gyroscope.x}`);
    console.log(`Angular velocity along the Y-axis ${gyroscope.y}`);
    console.log(`Angular velocity along the Z-axis ${gyroscope.z}`);
  });
  gyroscope.start();
} catch (err) {
  alert("Error:", err);
}

// updateText(1, 2, 3);
