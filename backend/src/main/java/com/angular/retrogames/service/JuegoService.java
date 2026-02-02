package com.angular.retrogames.service;

import com.angular.retrogames.entity.Juego;
import com.angular.retrogames.repository.JuegoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service // <--- ¡IMPORTANTE! Esto le dice a Spring que aquí está la lógica
public class JuegoService {

    @Autowired
    private JuegoRepository repo;

    // 1. LISTAR
    public List<Juego> listarTodos() {
        return repo.findAll();
    }

    // 2. OBTENER POR ID (Con validación)
    public Juego obtenerPorId(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Juego no encontrado"));
    }

    // 3. BUSCAR POR NOMBRE
    public List<Juego> buscarPorNombre(String nombre) {
        return repo.findByTituloContainingIgnoreCase(nombre);
    }

    // 4. GUARDAR
    public Juego guardar(Juego juego) {
        return repo.save(juego);
    }

    // 5. ACTUALIZAR (Toda la lógica de copiar datos va aquí)
    public Juego actualizar(Long id, Juego juegoDatos) {
        // Buscamos si existe (reutilizamos nuestro propio método)
        Juego juegoExistente = this.obtenerPorId(id);

        // Actualizamos los datos
        juegoExistente.setTitulo(juegoDatos.getTitulo());
        juegoExistente.setPlataforma(juegoDatos.getPlataforma());
        juegoExistente.setPrecio(juegoDatos.getPrecio());
        juegoExistente.setImagenUrl(juegoDatos.getImagenUrl());

        // Guardamos
        return repo.save(juegoExistente);
    }

    // 6. BORRAR
    public void borrar(Long id) {
        // Comprobamos si existe antes de intentar borrar
        if (repo.existsById(id)) {
            repo.deleteById(id);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se puede borrar, el juego no existe");
        }
    }
}