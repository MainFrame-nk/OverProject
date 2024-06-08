package nk.mframe.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import nk.mframe.dto.UserDTO;
import nk.mframe.exceptions.UserNotFoundException;
import nk.mframe.model.Role;
import nk.mframe.model.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import nk.mframe.config.WebSecurityConfig;
import nk.mframe.repositories.RoleRepository;
import nk.mframe.repositories.UserRepository;

import java.security.Principal;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImp implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder = WebSecurityConfig.bCryptPasswordEncoder();

//    @Transactional
//    @Override
//    public void save(User user) {
//        user.setPassword(WebSecurityConfig.bCryptPasswordEncoder().encode(user.getPassword()));
//        userRepository.save(user);
//    }

    @Transactional
    public UserDTO saveUser(UserDTO userDTO) {
        String email = userDTO.getEmail();
        String encoderPassword = passwordEncoder.encode(userDTO.getPassword());
        if (userRepository.findByEmail(userDTO.getEmail()) != null) return userDTO;
        User user = User.builder()
                .name(userDTO.getName())
                .nickname(userDTO.getNickname())
                .login(userDTO.getLogin())
                .phoneNumber(userDTO.getPhoneNumber())
                .email(userDTO.getEmail())
                .password(encoderPassword)
                //.roles(userDTO.getRoles().stream().map(x -> roleRepository.findByRole(x.getRole())).collect(Collectors.toSet()))
                .build();
        user.setActive(true);
        Role role = roleRepository.findRoleById(1);
        Set<Role> stringSet = new HashSet<>();
        stringSet.add(role);
        user.setRoles(stringSet);
        userRepository.save(user);
        log.info("Saving new User with email: {}", email);
        return userDTO;
    }

    @Transactional
    @Override
    public void deleteUser(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            log.info("Deleted User. Name: {}. Email: {}", user.get().getName(), user.get().getEmail());
            userRepository.deleteById(id);
        } else {
            log.error("Error! User not found!");
        }
    }

    @Override
    public User getUserByPrincipal(Principal principal) {
        if (principal == null) return new User();
        return userRepository.findByEmail(principal.getName());
    }

    @Override
    public void userBan(Long id) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            if (user.isActive()) {
                user.setActive(false);
                log.info("Ban user with id = {}; email: {}", user.getId(), user.getEmail());
            } else {
                user.setActive(true);
                log.info("Unban user with id = {}; email: {}", user.getId(), user.getEmail());
            }
            userRepository.save(user);
        }
    }

    @Override
    public UserDTO getById(Long id) {
        return UserDTO.toUserDTO(userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User with id: " + id + " not found!")));
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream().map(User::toUserDTO).sorted(Comparator.comparing(UserDTO::getId)).collect(Collectors.toList());
    }

    @Transactional
    @Override
    public UserDTO updateUser(UserDTO userDTO, Long id) {
        User user = userRepository
                .findById(id)
                .orElseThrow(() -> new UserNotFoundException("Пользователя: " + userDTO.getEmail() + " не найдено"));
        if (user != null) {
            user.setName(userDTO.getName());
            user.setNickname(userDTO.getNickname());
            user.setLogin(userDTO.getLogin());
            user.setEmail(userDTO.getEmail());
            user.setPhoneNumber(userDTO.getPhoneNumber());
            if (!passwordEncoder.matches(passwordEncoder.encode(userDTO.getPassword()), user.getPassword())) {
                user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
            }
            user.setRoles(userDTO.getRoles().stream().map(x -> roleRepository.findByRole(x.getRole())).collect(Collectors.toSet()));
            userRepository.save(user);
        }
        return userDTO;
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

//    @Override
//    @Transactional
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        User user = findByUsername(username);
//        if (user == null) {
//            throw new UsernameNotFoundException(String.format("User '%s' not found!", username));
//        }
//        return new org.springframework.security.core.userdetails.User(user.getLogin(), user.getPassword(),
//                mapRoleAuthority(user.getRoles()));
//    }
//    private Collection<? extends GrantedAuthority> mapRoleAuthority (Collection<Role> roles) {
//        return roles.stream().map(r -> new SimpleGrantedAuthority(r.getName())).collect(Collectors.toList());
//    }

}
