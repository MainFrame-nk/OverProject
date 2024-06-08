package nk.mframe.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import nk.mframe.dto.EventDTO;

import jakarta.persistence.*;
import java.math.BigInteger;

@Entity
@Table(name = "events")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Event implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "event_seq")
    @SequenceGenerator(name = "event_seq", sequenceName = "SEQ_EVENTS")
    private BigInteger id;

    @OneToOne(fetch = FetchType.LAZY)
//    @JoinTable(name = "events_quotes",
//            joinColumns = @JoinColumn(name = "event_id", referencedColumnName = "id"),
//            inverseJoinColumns = @JoinColumn(name = "quotation_id", referencedColumnName = "id"))
    @JsonIgnoreProperties(value = {"applications", "hibernateLazyInitializer"}) // Хорошо бы сделать обработку
    private Quotation quotationEvent = new Quotation();

//    private PeriodTime periodMatch = PeriodTime.FULL_TIME;
    private Byte periodMatch = (byte) 0;

    private Integer valueEvent = 0;

    @OneToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = {"applications", "hibernateLazyInitializer"}) // Хорошо бы сделать обработку
    private Team teamEvent = new Team();


    @OneToOne(fetch = FetchType.LAZY)
//    @JoinTable(name = "matches_events",
//            joinColumns = @JoinColumn(name = "match_id", referencedColumnName = "id"),
//            inverseJoinColumns = @JoinColumn(name = "event_id", referencedColumnName = "id"))
    @JsonIgnoreProperties(value = {"applications", "hibernateLazyInitializer"}) // Хорошо бы сделать обработку
    private Match matchEvent = new Match();

    @Override
    public String getAuthority() {
        return "Error!";
    }

    public EventDTO toEventDto() {
        return EventDTO.toEventDto(this);
    }
}
