package com.example.demo.repository;

import com.example.demo.model.entity.AusCity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AusLocationRepository extends JpaRepository<AusCity, Long> {
    @Query(value =
            "SELECT COUNT(*) FROM auscities.australian_postcodes " +
                    "WHERE Lat_precise >= :lat - 0.01 " +
                    "AND Lat_precise <= :lat + 0.01 " +
                    "AND Long_precise >= :lon - 0.01 " +
                    "AND Long_precise <= :lon + 0.01",
            nativeQuery = true)
    Long existsByCoordinates(
            @Param("lat") Double latitude,
            @Param("lon") Double longitude
    );
}
