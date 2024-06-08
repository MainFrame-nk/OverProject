package nk.mframe.dto;

import lombok.*;
import nk.mframe.model.League;
import nk.mframe.model.Team;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Component
public class TeamDTO {

    private Long id;
    private String name;
    private Set<LeagueDTO> leagueTeam = new HashSet<>();
    private Byte levelTeam;
    private Byte formTeam;

    public TeamDTO(Long id) {
        this.id = id;
    }

    public TeamDTO(String id) {
        this.id = Long.parseLong(id);
    }

    public static TeamDTO toTeamDto(Team team) {
        return TeamDTO.builder()
                .id(team.getId())
                .name(team.getName())
                .leagueTeam(team.getLeagueTeam().stream().map(League::toLeagueDto).collect(Collectors.toSet()))
                .levelTeam(team.getLevelTeam())
                .formTeam(team.getFormTeam())
                .build();
    }
}
