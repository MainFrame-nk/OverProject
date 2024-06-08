package nk.mframe.repositories;

import nk.mframe.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {
    Team findTeamByName(String nameTeam);
    Team findTeamById(Long id);

}
