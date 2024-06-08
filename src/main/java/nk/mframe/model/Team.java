package nk.mframe.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import nk.mframe.dto.TeamDTO;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Table(name = "teams")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Team implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "team_seq")
    @SequenceGenerator(name = "team_seq", sequenceName = "SEQ_TEAM")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "level_team")
    private Byte levelTeam;

    @Column(name = "form_team")
    private Byte formTeam;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "teams_leagues",
            joinColumns = @JoinColumn(name = "team_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "league_id", referencedColumnName = "id"))
    @JsonIgnoreProperties(value = {"applications", "hibernateLazyInitializer"}) // Хорошо бы сделать обработку
    private Set<League> leagueTeam = new HashSet<>();

    @Override
    public String getAuthority() {
        return name;
    }

    public TeamDTO toTeamDto() {
        return TeamDTO.toTeamDto(this);
    }

    public List<String> getNameLeagues() {
        return this.leagueTeam.stream().map(League::getNameLeague).collect(Collectors.toList());
    }

    public void addLeague(League league) {
        leagueTeam.add(league);
    }

    public String getAllLeaguesWithOutBrackets (Set<League> leagueTeam){
        return leagueTeam.stream().map(League::getNameLeague).collect(Collectors.joining(", "));
    }


}
