package nk.mframe.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import nk.mframe.dto.LeagueDTO;
import nk.mframe.model.League;
import nk.mframe.repositories.CountryRepository;
import nk.mframe.repositories.LeagueRepository;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LeagueServiceImp implements LeagueService{
    private final LeagueRepository leagueRepository;
    private final CountryRepository countryRepository;

    public LeagueServiceImp(LeagueRepository leagueRepository, CountryRepository countryRepository) {
        this.leagueRepository = leagueRepository;
        this.countryRepository = countryRepository;
    }

    @Override
    public League getLeagueByNameLeague(String leagueName) {
        return leagueRepository.findLeagueByNameLeague(leagueName);
    }

    @Override
    public League getLeagueById(Long id) {
        return leagueRepository.findLeagueById(id);
    }

    @Transactional
    public LeagueDTO saveLeague(LeagueDTO leagueDTO) {
        League league = League.builder()
                .nameLeague(leagueDTO.getNameLeague())
                .countryLeague(countryRepository.findCountryById(leagueDTO.getCountryLeague().getId()))
                .build();
        leagueRepository.save(league);
        return leagueDTO;
    }

    @Transactional
    @Override
    public void deleteLeague(Long id) {
        leagueRepository.deleteById(id);
    }

    @Override
    public List<LeagueDTO> getAllLeagues() {
        return leagueRepository.findAll().stream().map(League::toLeagueDto).sorted(Comparator.comparing(LeagueDTO::getId)).collect(Collectors.toList());
    }

    @Transactional
    @Override
    public LeagueDTO updateLeague(LeagueDTO leagueDTO, Long id) {
        League league = leagueRepository
                .findById(id)
                .orElseThrow(); // Нужен Exception на проверку существования команды, возможно
        league.setNameLeague(leagueDTO.getNameLeague());
        league.setCountryLeague(countryRepository.findCountryById(leagueDTO.getCountryLeague().getId()));
        leagueRepository.save(league);
        return leagueDTO;
    }
}
