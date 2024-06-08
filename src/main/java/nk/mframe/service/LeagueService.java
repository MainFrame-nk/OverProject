package nk.mframe.service;

import nk.mframe.dto.LeagueDTO;
import nk.mframe.model.League;

import java.util.List;

public interface LeagueService {

    List<LeagueDTO> getAllLeagues();
    League getLeagueByNameLeague(String league);
    LeagueDTO saveLeague(LeagueDTO leagueDTO);
    League getLeagueById(Long id);
    void deleteLeague(Long id);
    LeagueDTO updateLeague(LeagueDTO leagueDTO, Long id);
}
