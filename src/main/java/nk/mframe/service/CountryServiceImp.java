package nk.mframe.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import nk.mframe.dto.CountryDTO;
import nk.mframe.model.Country;
import nk.mframe.repositories.CountryRepository;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CountryServiceImp implements CountryService{
    private final CountryRepository countryRepository;

    public CountryServiceImp(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    @Override
    public Country getCountryByNameCountry(String nameCountry) {
        return countryRepository.findCountryByNameCountry(nameCountry);
    }

    @Override
    public Country getCountryById(Integer id) {
        return countryRepository.findCountryById(id);
    }

    @Transactional
    public CountryDTO saveCountry(CountryDTO countryDTO) {
        Country country = Country.builder()
                .nameCountry(countryDTO.getNameCountry())
                .flag(countryDTO.getFlag())
                .build();
        countryRepository.save(country);
        return countryDTO;
    }

    @Transactional
    @Override
    public void deleteCountry(Integer id) {
        countryRepository.deleteById(id);
    }

    @Override
    public List<CountryDTO> getAllCountries() {
        return countryRepository.findAll().stream().map(Country::toCountryDto).sorted(Comparator.comparing(CountryDTO::getId)).collect(Collectors.toList());
    }

    @Transactional
    @Override
    public CountryDTO updateCountry(CountryDTO countryDTO, Integer id) {
        Country country = countryRepository
                .findById(id)
                .orElseThrow(); // Нужен Exception на проверку существования команды, возможно
        country.setNameCountry(countryDTO.getNameCountry());
        country.setFlag(countryDTO.getFlag());
        countryRepository.save(country);
        return countryDTO;
    }
}
