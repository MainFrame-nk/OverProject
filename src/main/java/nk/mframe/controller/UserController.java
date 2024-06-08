package nk.mframe.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import nk.mframe.dto.UserDTO;
import nk.mframe.service.UserServiceImp;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import nk.mframe.service.MatchService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.security.AuthProvider;
import java.security.Principal;

@Controller
@Slf4j
@RequiredArgsConstructor
public class UserController {
    private final UserServiceImp userService;

    @GetMapping("/")
    public String mainPage(Principal principal, Model model) {
        model.addAttribute("user", userService.getUserByPrincipal(principal));
        return "index";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/analyze")
    public String statistic() {
        return "analyz";
    }

    @GetMapping("/admin")
    public String adminpanel() {
        return "admin";
    }

    @GetMapping("/registration")
    public String registration() {
        return "registration";
    }

    @PostMapping("/registration")
    public String createUser(UserDTO userDTO, Model model) {
        if (userService.findByEmail(userDTO.getEmail()) != null) {
            model.addAttribute("errorMessage", "Пользователь с email: " + userDTO.getEmail() + " уже существует.");
            return "registration";
        }
        userService.saveUser(userDTO);
        return "redirect:/login";
    }

    @GetMapping("/teams")
    public String teamsPage() {
        return "teams";
    }

//    @GetMapping("/match/{id}/events")
//    public String matchInfoPage(@PathVariable BigInteger id, Model model) {
//        Iterable<EventDTO> events = matchService.getEventsByMatchId(id);
//        model.addAttribute("events", events);
//        return "match-info";
//    }
}
