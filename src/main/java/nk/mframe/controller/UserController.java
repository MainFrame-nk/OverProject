package nk.mframe.controller;

import lombok.RequiredArgsConstructor;
import nk.mframe.dto.UserDTO;
import nk.mframe.service.UserServiceImp;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
@RequiredArgsConstructor
public class UserController {
    private final UserServiceImp userService;
    @GetMapping("/")
    public String mainPage() {
        return "index";
    }
    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/registration")
    public String registration() {
        return "registration";
    }

    @PostMapping("/registration")
    public String createUser(UserDTO userDTO, Model model) {
        UserDTO user = userService.saveUser(userDTO);
        if (user != null) {
            model.addAttribute("errorMessage", "Пользователь с email: " + userDTO.getEmail() + " уже существует.");
            return "registration";
        }
        return "redirect:/login";
    }
}
