package nk.mframe.repositories;

import nk.mframe.model.Match;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;

@Repository
public interface MatchRepository extends JpaRepository<Match, BigInteger> {
//    Match findMatchByNameLeague(String nameLeague);
    Match findMatchById(BigInteger id);

//    @Query("select e from Match e left join fetch e.eventsMatch where e.eventsMatch=:matchId")
//    List<EventDTO> findEventsByMatch(BigInteger matchId);
}
