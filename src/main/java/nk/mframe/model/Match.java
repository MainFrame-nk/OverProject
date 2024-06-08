package nk.mframe.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import nk.mframe.dto.MatchDTO;

import jakarta.persistence.*;
import java.math.BigInteger;
import java.time.LocalDateTime;

@Entity
@Table(name = "matches")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Match implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "match_seq")
    @SequenceGenerator(name = "match_seq", sequenceName = "SEQ_MATCHES")
    private BigInteger id;

    @Column(name = "date_time_match")
    private LocalDateTime dateTimeMatch;

    @OneToOne(fetch = FetchType.LAZY)
//    @JoinTable(name = "matches_leagues",
//            joinColumns = @JoinColumn(name = "match_id", referencedColumnName = "id"),
//            inverseJoinColumns = @JoinColumn(name = "league_id", referencedColumnName = "id"))
    @JsonIgnoreProperties(value = {"applications", "hibernateLazyInitializer"}) // Хорошо бы сделать обработку
    private League leagueMatch = new League();

    @OneToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = {"applications", "hibernateLazyInitializer"}) // Хорошо бы сделать обработку
    private Team homeTeam = new Team();

    @OneToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = {"applications", "hibernateLazyInitializer"}) // Хорошо бы сделать обработку
    private Team guestTeam = new Team();

    @Override
    public String getAuthority() {
        return dateTimeMatch.toString();
    }

    public MatchDTO toMatchDto() {
        return MatchDTO.toMatchDto(this);
    }
}
