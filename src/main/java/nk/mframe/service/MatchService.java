package nk.mframe.service;

import nk.mframe.dto.MatchDTO;
import nk.mframe.model.Match;

import java.math.BigInteger;
import java.util.List;

public interface MatchService {

    List<MatchDTO> getAllMatches();
//    Match getMatchByNameLeague(String nameLeague);
    MatchDTO saveMatch(MatchDTO matchDTO);
    Match getMatchById(BigInteger id);
    void deleteMatch(BigInteger id);
    MatchDTO updateMatch(MatchDTO matchDTO, BigInteger id);
}
