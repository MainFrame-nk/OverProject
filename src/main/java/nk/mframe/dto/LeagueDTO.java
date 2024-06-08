package nk.mframe.dto;

import lombok.*;
import nk.mframe.model.League;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Component
public class LeagueDTO {

    private Long id;
    private String nameLeague;
    private CountryDTO countryLeague = new CountryDTO();

    public LeagueDTO(Long id) {
        this.id = id;
    }

    public LeagueDTO(String id) {
        this.id = Long.parseLong(id);
    }

    public static LeagueDTO toLeagueDto(League league) {
        return LeagueDTO.builder()
                .id(league.getId())
                .nameLeague(league.getNameLeague())
                .countryLeague(league.getCountryLeague().toCountryDto())
                .build();
    }
}
