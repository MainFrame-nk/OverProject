package nk.mframe.service;

import nk.mframe.model.Team;
import nk.mframe.dto.TeamDTO;

import java.util.List;

public interface TeamService {

    List<TeamDTO> getAllTeams();
//    List<League> getLeaguesByTeamId(Long teamId);
    Team getTeamByName(String team);
    TeamDTO saveTeam(TeamDTO teamDTO);
    Team getTeamById(Long id);
    void deleteTeam(Long id);
    TeamDTO updateTeam(TeamDTO teamDTO, Long id);
}
