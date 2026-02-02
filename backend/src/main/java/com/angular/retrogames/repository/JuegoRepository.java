package com.angular.retrogames.repository;

import com.angular.retrogames.entity.Juego;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JuegoRepository extends JpaRepository<Juego, Long> {
    // Método mágico para el buscador
    // SQL automático: SELECT * FROM juegos WHERE titulo LIKE '%texto%'
    List<Juego> findByTituloContainingIgnoreCase(String texto);
}