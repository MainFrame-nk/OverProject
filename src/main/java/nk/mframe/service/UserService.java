package nk.mframe.service;

import nk.mframe.dto.UserDTO;
import nk.mframe.model.User;

import java.security.Principal;
import java.util.List;
import java.util.Map;

public interface UserService {
    List<UserDTO> getAllUsers();
    UserDTO saveUser(UserDTO userDTO);
    User findByEmail(String email);
    UserDTO getById(Long id);
    void userBan(Long id);
    void deleteUser(Long id);
    void changeUserRoles(Long id, Map<String, String> roles);
    User getUserByPrincipal(Principal principal);
    UserDTO updateUser(UserDTO userDTO, Long id);
}
