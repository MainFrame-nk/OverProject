package nk.mframe.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import nk.mframe.model.Event;

import java.math.BigInteger;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, BigInteger> {
//    Event findEventByNameQuotation(String nameQuotation);
    Event findEventById(BigInteger id);

//    @Query("select e from Event e left join fetch e.teamEvent where e.teamEvent=:teamId")
//    List<EventDTO> findEventsByTeamEvent(Long teamId);

    @Query("select e from Event e left join fetch e.quotationEvent where e.quotationEvent.id=:quotationId")
    List<Event> findEventsByQuotation(Integer quotationId);

    @Query("select e from Event e left join fetch e.teamEvent where e.teamEvent.id=:teamId")
    List<Event> findEventsByTeam(Long teamId);

    @Query("select e from Event e left join fetch e.matchEvent where e.matchEvent.id=:matchId")
    List<Event> findEventsByMatch(BigInteger matchId);

    @Query("select e from Event e left join fetch e.matchEvent me " +
            "left join fetch e.teamEvent te " +
            "left join fetch e.quotationEvent qe " +
            "where me.id = :matchId and te.id = :teamId and qe.id = :quotationId and e.periodMatch = :periodMatch")
    Event findEventByMatchAndTeamAndQuotationAndPeriod(BigInteger matchId, Long teamId, Integer quotationId, Byte periodMatch);

    @Query("select e from Event e left join fetch e.matchEvent me " +
            "left join fetch e.teamEvent te " +
            "left join fetch e.quotationEvent qe " +
            "where me.id = :matchId and te.id = :teamId and qe.id = :quotationId")
    List<Event> findEventsByMatchAndTeamAndQuotation(BigInteger matchId, Long teamId, Integer quotationId);
}
