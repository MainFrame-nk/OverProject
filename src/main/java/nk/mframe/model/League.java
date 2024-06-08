package nk.mframe.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import nk.mframe.dto.LeagueDTO;

import jakarta.persistence.*;

@Entity
@Table(name = "leagues")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class League implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "league_seq")
    @SequenceGenerator(name = "league_seq", sequenceName = "SEQ_LEAGUES")
    private Long id;

    @Column(name = "name_league")
    private String nameLeague;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinTable(name = "countries_leagues",
            joinColumns = @JoinColumn(name = "league_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "country_id", referencedColumnName = "id"))
    @JsonIgnoreProperties(value = {"applications", "hibernateLazyInitializer"}) // Хорошо бы сделать обработку
    private Country countryLeague = new Country();

    @Override
    public String getAuthority() {
        return nameLeague;
    }

    public LeagueDTO toLeagueDto() {
        return LeagueDTO.toLeagueDto(this);
    }


    public String getNameCountry() {
        return this.countryLeague.getNameCountry();
    }

//    public void addCountry(Country country) {
//        countryLeague.add(country);
//    }

//    public String getAllCountriesWithOutBrackets (Set<Country> countryLeague){
//        return countryLeague.stream().map(Country::getNameCountry).collect(Collectors.joining(", "));
//    }
}
