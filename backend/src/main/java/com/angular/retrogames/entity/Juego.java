package com.angular.retrogames.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "juegos")
@Data // Esto es Lombok: Crea getters, setters, etc. automágicamente
public class Juego {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private String plataforma; // Ej: SNES, PS1
    private Double precio;
    private String imagenUrl;
}
