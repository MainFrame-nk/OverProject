package nk.mframe.service;

import nk.mframe.repositories.EventRepository;
import nk.mframe.repositories.LeagueRepository;
import nk.mframe.repositories.MatchRepository;
import nk.mframe.repositories.TeamRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import nk.mframe.dto.MatchDTO;
import nk.mframe.model.Match;

import java.math.BigInteger;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MatchServiceImp implements MatchService{
    private final MatchRepository matchRepository;
    private final LeagueRepository leagueRepository;
    private final TeamRepository teamRepository;

    private final EventRepository eventRepository;

    public MatchServiceImp(MatchRepository matchRepository, LeagueRepository leagueRepository, TeamRepository teamRepository, EventRepository eventRepository) {
        this.matchRepository = matchRepository;
        this.leagueRepository = leagueRepository;
        this.teamRepository = teamRepository;
        this.eventRepository = eventRepository;
    }

//    @Override
//    public Match getMatchByNameLeague(String nameLeague) {
//        return matchRepository.findMatchByNameLeague(nameLeague);
//    }

    @Override
    public Match getMatchById(BigInteger id) {
        return matchRepository.findMatchById(id);
    }

    @Transactional
    public MatchDTO saveMatch(MatchDTO matchDTO) {
        Match match = Match.builder()
                .dateTimeMatch(matchDTO.getDateTimeMatch())
                .leagueMatch(leagueRepository.findLeagueById(matchDTO.getLeagueMatch().getId()))
                .homeTeam(teamRepository.findTeamById(matchDTO.getHomeTeam().getId()))
                .guestTeam(teamRepository.findTeamById(matchDTO.getGuestTeam().getId()))
//                .eventsMatch(matchDTO.getEventsMatch().stream().map(x -> eventRepository.findEventById(x.getId())).collect(Collectors.toSet()))
                .build();
        matchRepository.save(match);
        return matchDTO;
    }

    @Transactional
    @Override
    public void deleteMatch(BigInteger id) {
        matchRepository.deleteById(id);
    }

    @Override
    public List<MatchDTO> getAllMatches() {
        return matchRepository.findAll().stream().map(Match::toMatchDto).sorted(Comparator.comparing(MatchDTO::getId)).collect(Collectors.toList());
    }

    @Transactional
    @Override
    public MatchDTO updateMatch(MatchDTO matchDTO, BigInteger id) {
        Match match = matchRepository
                .findById(id)
                .orElseThrow(); // Нужен Exception на проверку существования команды, возможно
        match.setDateTimeMatch(matchDTO.getDateTimeMatch());
        match.setLeagueMatch(leagueRepository.findLeagueById(matchDTO.getLeagueMatch().getId()));
        match.setHomeTeam(teamRepository.findTeamById(matchDTO.getHomeTeam().getId()));
        match.setGuestTeam(teamRepository.findTeamById(matchDTO.getGuestTeam().getId()));
//        match.setEventsMatch(matchDTO.getEventsMatch().stream().map(x -> eventRepository.findEventById(x.getId())).collect(Collectors.toSet()));
        matchRepository.save(match);
        return matchDTO;
    }
}
