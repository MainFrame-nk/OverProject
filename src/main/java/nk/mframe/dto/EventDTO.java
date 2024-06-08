package nk.mframe.dto;

import lombok.*;
import nk.mframe.model.Event;
import org.springframework.stereotype.Component;

import java.math.BigInteger;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Component
public class EventDTO {

    private BigInteger id;
    private QuotationDTO quotationEvent = new QuotationDTO();
    private Byte periodMatch;
    private Integer valueEvent;
    private TeamDTO teamEvent = new TeamDTO();
    private MatchDTO matchEvent = new MatchDTO();

    public EventDTO(BigInteger id) {
        this.id = id;
    }

    public EventDTO(String id) {
        this.id = BigInteger.valueOf(Integer.parseInt(id));
    }

    public static EventDTO toEventDto(Event event) {
        return EventDTO.builder()
                .id(event.getId())
                .quotationEvent(event.getQuotationEvent().toQuotationDto())
                .periodMatch(event.getPeriodMatch())
                .valueEvent(event.getValueEvent())
                .teamEvent(event.getTeamEvent().toTeamDto())
                .matchEvent(event.getMatchEvent().toMatchDto())
                .build();
    }
}
