package nk.mframe.service;

import nk.mframe.dto.CountryDTO;
import nk.mframe.model.Country;

import java.util.List;

public interface CountryService {

    List<CountryDTO> getAllCountries();
    Country getCountryByNameCountry(String country);
    CountryDTO saveCountry(CountryDTO countryDTO);
    Country getCountryById(Integer id);
    void deleteCountry(Integer id);
    CountryDTO updateCountry(CountryDTO countryDTO, Integer id);
}
