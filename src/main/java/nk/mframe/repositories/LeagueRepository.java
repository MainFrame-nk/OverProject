package nk.mframe.repositories;

import nk.mframe.model.League;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeagueRepository extends JpaRepository<League, Long> {
    League findLeagueByNameLeague(String nameLeague);
    League findLeagueById(Long id);
}
