package nk.mframe.service;

import nk.mframe.repositories.EventRepository;
import nk.mframe.repositories.MatchRepository;
import nk.mframe.repositories.QuotationRepository;
import nk.mframe.repositories.TeamRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import nk.mframe.dto.EventDTO;
import nk.mframe.model.Event;

import java.math.BigInteger;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventServiceImp implements EventService{
    private final EventRepository eventRepository;
    private final QuotationRepository quotationRepository;
    private final MatchRepository matchRepository;
    private final TeamRepository teamRepository;

    public EventServiceImp(EventRepository eventRepository, QuotationRepository quotationRepository, MatchRepository matchRepository, TeamRepository teamRepository) {
        this.eventRepository = eventRepository;
        this.quotationRepository = quotationRepository;
        this.matchRepository = matchRepository;
        this.teamRepository = teamRepository;
    }

//    @Override
//    public Event getEventByNameQuotation(String nameQuotation) {
//        return eventRepository.findEventByNameQuotation(nameQuotation);
//    }

    @Override
    public Event getEventById(BigInteger id) {
        return eventRepository.findEventById(id);
    }

//    @Override
//    public List<EventDTO> getEventsByTeamId(Long teamId) {
//        return eventRepository.findEventsByTeamEvent(teamId);
//    }

    @Transactional
    public EventDTO saveEvent(BigInteger matchId, EventDTO eventDTO) {
        Event event = Event.builder()
                .quotationEvent(quotationRepository.findQuotationById(eventDTO.getQuotationEvent().getId()))
                .periodMatch(eventDTO.getPeriodMatch())
                .valueEvent(eventDTO.getValueEvent())
                .teamEvent(teamRepository.findTeamById(eventDTO.getTeamEvent().getId()))
                .matchEvent(matchRepository.findMatchById(matchId))
                .build();
        eventRepository.save(event);
        return eventDTO;
    }

    @Transactional
    @Override
    public void deleteEvent(BigInteger id) {
        eventRepository.deleteById(id);
    }

    @Override
    public List<EventDTO> getAllEvents() {
        return eventRepository.findAll().stream().map(Event::toEventDto).sorted(Comparator.comparing(EventDTO::getId)).collect(Collectors.toList());
    }

    @Override
    public List<EventDTO> getEventsByMatchId(BigInteger matchId) {
        return eventRepository.findEventsByMatch(matchId).stream().map(Event::toEventDto).sorted(Comparator.comparing(EventDTO::getId)).collect(Collectors.toList());
    }

    @Override
    public List<EventDTO> getEventsByTeamId(Long teamId) {
        return eventRepository.findEventsByTeam(teamId).stream().map(Event::toEventDto).sorted(Comparator.comparing(EventDTO::getId)).collect(Collectors.toList());
    }

    @Override
    public List<EventDTO> getEventsByQuotation(Integer quotationId) {
        return eventRepository.findEventsByQuotation(quotationId).stream().map(Event::toEventDto).sorted(Comparator.comparing(EventDTO::getId)).collect(Collectors.toList());
    }

    @Override
    public List<EventDTO> getEventsByMatchAndTeamAndQuotation(BigInteger matchId, Long teamId, Integer quotationId) {
        return eventRepository.findEventsByMatchAndTeamAndQuotation(matchId, teamId, quotationId).stream().map(Event::toEventDto).sorted(Comparator.comparing(EventDTO::getId)).collect(Collectors.toList());
    }

    @Override
    public EventDTO getEventByMatchAndTeamAndQuotationAndPeriod(BigInteger matchId, Long teamId, Integer quotationId, Byte periodMatch) {
        return eventRepository.findById(eventRepository.findEventByMatchAndTeamAndQuotationAndPeriod(matchId, teamId, quotationId, periodMatch).getId()).orElseThrow().toEventDto();
    }

    public Integer countedValueEvent(EventDTO eventDTO) {
        Event event = eventRepository
                .findById(eventDTO.getId())
                .orElseThrow(); // Нужен Exception на проверку существования команды, возможно
        //ArrayList<String> Events = new ArrayList<>();

        return event.getValueEvent();
    }

    @Transactional
    @Override
    public EventDTO updateEvent(EventDTO eventDTO, BigInteger id) {
        Event event = eventRepository
                .findById(id)
                .orElseThrow(); // Нужен Exception на проверку существования команды, возможно
        event.setQuotationEvent(quotationRepository.findQuotationById(eventDTO.getQuotationEvent().getId()));
        event.setPeriodMatch(eventDTO.getPeriodMatch());
        event.setValueEvent(eventDTO.getValueEvent());

        if (eventDTO.getTeamEvent() != null) {
            event.setTeamEvent(teamRepository.findTeamById(eventDTO.getTeamEvent().getId()));
        }
        eventRepository.save(event);
        return eventDTO;
    }
}
