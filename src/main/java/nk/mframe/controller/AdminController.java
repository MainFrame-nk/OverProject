package nk.mframe.controller;

import nk.mframe.dto.*;
import nk.mframe.model.*;
import nk.mframe.service.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {
    private final UserService userService;
    private final TeamService teamService;
    private final LeagueService leagueService;
    private final CountryService countryService;
    private final MatchService matchService;
    private final EventService eventService;
    private final QuotationService quotationService;
    public AdminController(UserService userService, TeamService teamService,
                           LeagueService leagueService, CountryService countryService,
                           MatchService matchService,
                           EventService eventService, QuotationService quotationService) {
        this.userService = userService;
        this.teamService = teamService;
        this.leagueService = leagueService;
        this.countryService = countryService;
        this.matchService = matchService;
        this.eventService = eventService;
        this.quotationService = quotationService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getAllUsers());
    }

    @PostMapping("/newUser")
    public ResponseEntity<UserDTO> saveUser(@RequestBody UserDTO userDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.saveUser(userDTO));
    }

    @PatchMapping("/user/update/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @RequestBody UserDTO userDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.updateUser(userDTO, id));
    }

    @DeleteMapping("/user/delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("user/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getById(id));
    }

    @GetMapping("/user")
    public ResponseEntity<User> getCurrentUser(Principal principal) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.findByEmail(principal.getName()));
    }

    @GetMapping("/teams")
    public ResponseEntity<List<TeamDTO>> getAllTeams() {
        return ResponseEntity.status(HttpStatus.OK).body(teamService.getAllTeams());
    }

    @PostMapping("/newTeam")
    public ResponseEntity<TeamDTO> saveTeam(@RequestBody TeamDTO teamDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(teamService.saveTeam(teamDTO));
    }

    @PatchMapping("/team/update/{id}")
    public ResponseEntity<TeamDTO> updateTeam(@PathVariable Long id, @RequestBody TeamDTO teamDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(teamService.updateTeam(teamDTO, id));
    }

    @DeleteMapping("/team/delete/{id}")
    public ResponseEntity<Void> deleteTeam(@PathVariable Long id) {
        teamService.deleteTeam(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("team/{id}")
    public ResponseEntity<Team> getTeam(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(teamService.getTeamById(id));
    }

    @GetMapping("/leagues")
    public ResponseEntity<List<LeagueDTO>> getAllLeagues() {
        return ResponseEntity.status(HttpStatus.OK).body(leagueService.getAllLeagues());
    }

    @PostMapping("/newLeague")
    public ResponseEntity<LeagueDTO> saveLeague(@RequestBody LeagueDTO leagueDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(leagueService.saveLeague(leagueDTO));
    }

    @PatchMapping("/league/update/{id}")
    public ResponseEntity<LeagueDTO> updateLeague(@PathVariable Long id, @RequestBody LeagueDTO leagueDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(leagueService.updateLeague(leagueDTO, id));
    }

    @DeleteMapping("/league/delete/{id}")
    public ResponseEntity<Void> deleteLeague(@PathVariable Long id) {
        leagueService.deleteLeague(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("league/{id}")
    public ResponseEntity<League> getLeague(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(leagueService.getLeagueById(id));
    }

    @GetMapping("/countries")
    public ResponseEntity<List<CountryDTO>> getAllCountries() {
        return ResponseEntity.status(HttpStatus.OK).body(countryService.getAllCountries());
    }

    @PostMapping("/newCountry")
    public ResponseEntity<CountryDTO> saveCountry(@RequestBody CountryDTO countryDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(countryService.saveCountry(countryDTO));
    }

    @PatchMapping("/country/update/{id}")
    public ResponseEntity<CountryDTO> updateCountry(@PathVariable Integer id, @RequestBody CountryDTO countryDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(countryService.updateCountry(countryDTO, id));
    }

    @DeleteMapping("/country/delete/{id}")
    public ResponseEntity<Void> deleteCountry(@PathVariable Integer id) {
        countryService.deleteCountry(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("country/{id}")
    public ResponseEntity<Country> getCountry(@PathVariable Integer id) {
        return ResponseEntity.status(HttpStatus.OK).body(countryService.getCountryById(id));
    }

    @GetMapping("/matches")
    public ResponseEntity<List<MatchDTO>> getAllMatches() {
        return ResponseEntity.status(HttpStatus.OK).body(matchService.getAllMatches());
    }

    @PostMapping("/newMatch")
    public ResponseEntity<MatchDTO> saveMatch(@RequestBody MatchDTO matchDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(matchService.saveMatch(matchDTO));
    }

    @PatchMapping("/match/update/{id}")
    public ResponseEntity<MatchDTO> updateMatch(@PathVariable BigInteger id, @RequestBody MatchDTO matchDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(matchService.updateMatch(matchDTO, id));
    }

    @DeleteMapping("/match/delete/{id}")
    public ResponseEntity<Void> deleteMatch(@PathVariable BigInteger id) {
        matchService.deleteMatch(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("match/{id}")
    public ResponseEntity<Match> getMatch(@PathVariable BigInteger id) {
        return ResponseEntity.status(HttpStatus.OK).body(matchService.getMatchById(id));
    }

    @GetMapping("/events")
    public ResponseEntity<List<EventDTO>> getAllEvents() {
        return ResponseEntity.status(HttpStatus.OK).body(eventService.getAllEvents());
    }


    @PostMapping("match/{matchId}/newEvent")
    public ResponseEntity<EventDTO> saveEvent(@PathVariable BigInteger matchId, @RequestBody EventDTO eventDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(eventService.saveEvent(matchId, eventDTO));
    }

    @PatchMapping("/event/update/{id}")
    public ResponseEntity<EventDTO> updateEvent(@RequestBody EventDTO eventDTO, @PathVariable BigInteger id) {
        return ResponseEntity.status(HttpStatus.CREATED).body(eventService.updateEvent(eventDTO, id));
    }

    @DeleteMapping("/event/delete/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable BigInteger id) {
        eventService.deleteEvent(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("event/{id}")
    public ResponseEntity<Event> getEvent(@PathVariable BigInteger id) {
        return ResponseEntity.status(HttpStatus.OK).body(eventService.getEventById(id));
    }

//    @GetMapping("events/{teamId}")
//    public ResponseEntity<List<EventDTO>> getEventsByTeamId(@PathVariable Long teamId) {
//        return ResponseEntity.status(HttpStatus.OK).body(eventService.getEventsByTeamId(teamId));
//    }

    @GetMapping("match/{matchId}/events")
    public ResponseEntity<List<EventDTO>> getEventsByMatchId(@PathVariable BigInteger matchId) {
        return ResponseEntity.status(HttpStatus.OK).body(eventService.getEventsByMatchId(matchId));
    }

    @GetMapping("team/{teamId}/events")
    public ResponseEntity<List<EventDTO>> getEventsByTeamId(@PathVariable Long teamId) {
        return ResponseEntity.status(HttpStatus.OK).body(eventService.getEventsByTeamId(teamId));
    }

    @GetMapping("quotation/{quotationId}/events")
    public ResponseEntity<List<EventDTO>> getEventsByQuotation(@PathVariable Integer quotationId) {
        return ResponseEntity.status(HttpStatus.OK).body(eventService.getEventsByQuotation(quotationId));
    }

    @GetMapping("/events/{matchId}/{teamId}/{quotationId}")
    public ResponseEntity<List<EventDTO>> getEventsByMatchAndTeamAndQuotation(@PathVariable BigInteger matchId, @PathVariable Long teamId, @PathVariable Integer quotationId) {
        return ResponseEntity.status(HttpStatus.OK).body(eventService.getEventsByMatchAndTeamAndQuotation(matchId, teamId, quotationId));
    }

    @GetMapping("/events/{matchId}/{teamId}/{quotationId}/{periodMatch}")
    public ResponseEntity<EventDTO> getEventByMatchAndTeamAndQuotationAndPeriod(@PathVariable BigInteger matchId, @PathVariable Long teamId, @PathVariable Integer quotationId, @PathVariable Byte periodMatch) {
        return ResponseEntity.status(HttpStatus.OK).body(eventService.getEventByMatchAndTeamAndQuotationAndPeriod(matchId, teamId, quotationId, periodMatch));
    }

    @GetMapping("/quotes")
    public ResponseEntity<List<QuotationDTO>> getAllQuotes() {
        return ResponseEntity.status(HttpStatus.OK).body(quotationService.getAllQuotes());
    }

    @PostMapping("/newQuotation")
    public ResponseEntity<QuotationDTO> saveQuotation(@RequestBody QuotationDTO quotationDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(quotationService.saveQuotation(quotationDTO));
    }

    @PatchMapping("/quotation/update/{id}")
    public ResponseEntity<QuotationDTO> updateQuotation(@PathVariable Integer id, @RequestBody QuotationDTO quotationDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(quotationService.updateQuotation(quotationDTO, id));
    }

    @DeleteMapping("/quotation/delete/{id}")
    public ResponseEntity<Void> deleteQuotation(@PathVariable Integer id) {
        quotationService.deleteQuotation(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("quotation/{id}")
    public ResponseEntity<Quotation> getQuotation(@PathVariable Integer id) {
        return ResponseEntity.status(HttpStatus.OK).body(quotationService.getQuotationById(id));
    }

//    @GetMapping("quotation/{name}")
//    public ResponseEntity<Quotation> getQuotationByName(@PathVariable String name) {
//        return ResponseEntity.status(HttpStatus.OK).body(quotationService.getQuotationByName(name));
//    }
}
