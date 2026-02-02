package com.angular.retrogames.controller;

import com.angular.retrogames.entity.Juego;
import com.angular.retrogames.service.JuegoService; // <--- Ahora importamos el Servicio
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/juegos")
@CrossOrigin(origins = "*")
public class JuegoController {

    @Autowired
    private JuegoService service; // <--- Inyectamos al servicio

    @GetMapping
    public List<Juego> listar() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public Juego obtenerPorId(@PathVariable Long id) {
        return service.obtenerPorId(id);
    }

    @GetMapping("/buscar/{nombre}")
    public List<Juego> buscarPorNombre(@PathVariable String nombre) {
        return service.buscarPorNombre(nombre);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Juego guardar(@RequestBody Juego juego) {
        return service.guardar(juego);
    }

    @PutMapping("/{id}")
    public Juego actualizar(@PathVariable Long id, @RequestBody Juego juego) {
        return service.actualizar(id, juego);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void borrar(@PathVariable Long id) {
        service.borrar(id);
    }

    // El endpoint de instrucciones sigue igual (no necesita servicio porque son datos fijos)
    @GetMapping("/instrucciones")
    public Map<String, String> verInstrucciones() {
        Map<String, String> guia = new java.util.LinkedHashMap<>();
        guia.put("titulo", "🕹️ API RETROGAMES - DOCUMENTACIÓN");
        guia.put("1. LISTAR", "/api/juegos");
        guia.put("2. DETALLE", "/api/juegos/{id}");
        guia.put("3. BUSCAR", "/api/juegos/buscar/{nombre}");
        guia.put("4. CREAR", "POST /api/juegos");
        guia.put("5. EDITAR", "PUT /api/juegos/{id}");
        guia.put("6. BORRAR", "DELETE /api/juegos/{id}");
        return guia;
    }
}