package nk.mframe.repositories;

import nk.mframe.model.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CountryRepository extends JpaRepository<Country, Integer> {
    Country findCountryByNameCountry(String nameCountry);
    Country findCountryById(Integer id);
}
