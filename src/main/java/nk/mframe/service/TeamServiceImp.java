package nk.mframe.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import nk.mframe.dto.TeamDTO;
import nk.mframe.model.Team;
import nk.mframe.repositories.LeagueRepository;
import nk.mframe.repositories.TeamRepository;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TeamServiceImp implements TeamService{
    private final TeamRepository teamRepository;
    private final LeagueRepository leagueRepository;

    public TeamServiceImp(TeamRepository teamRepository, LeagueRepository leagueRepository) {
        this.teamRepository = teamRepository;
        this.leagueRepository = leagueRepository;
    }

    @Override
    public Team getTeamByName(String teamName) {
        return teamRepository.findTeamByName(teamName);
    }

    @Override
    public Team getTeamById(Long id) {
        return teamRepository.findTeamById(id);
    }


    @Transactional
    public TeamDTO saveTeam(TeamDTO teamDTO) {
        Team team = Team.builder()
                .name(teamDTO.getName())
                .leagueTeam(teamDTO.getLeagueTeam().stream().map(x -> leagueRepository.findLeagueById(x.getId())).collect(Collectors.toSet()))
                .levelTeam(teamDTO.getLevelTeam())
                .formTeam(teamDTO.getFormTeam())
                .build();
        teamRepository.save(team);
        return teamDTO;
    }

    @Transactional
    @Override
    public void deleteTeam(Long id) {
        teamRepository.deleteById(id);
    }

    @Override
    public List<TeamDTO> getAllTeams() {
        return teamRepository.findAll().stream().map(Team::toTeamDto).sorted(Comparator.comparing(TeamDTO::getId)).collect(Collectors.toList());
    }

//    @Override
//    public  List<League> getLeaguesByTeamId(Long teamId) {
//        Team team = teamRepository.findTeamById(teamId);
//        return leagueRepository.findLeagueByTeam(team);
//    }

    @Transactional
    @Override
    public TeamDTO updateTeam(TeamDTO teamDTO, Long id) {
        Team team = teamRepository
                .findById(id)
                .orElseThrow(); // Нужен Exception на проверку существования команды, возможно
        team.setName(teamDTO.getName());
        team.setLeagueTeam(teamDTO.getLeagueTeam().stream().map(x -> leagueRepository.findLeagueById(x.getId())).collect(Collectors.toSet()));
        team.setLevelTeam(teamDTO.getLevelTeam());
        team.setFormTeam(teamDTO.getFormTeam());
        teamRepository.save(team);
        return teamDTO;
    }


}

