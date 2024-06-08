package nk.mframe.service;

import nk.mframe.dto.UserDTO;
import nk.mframe.model.User;

import java.security.Principal;
import java.util.List;

public interface UserService {
    UserDTO saveUser(UserDTO userDTO);
    UserDTO getById(Long id);
    void deleteUser(Long id);
    List<UserDTO> getAllUsers();
    UserDTO updateUser(UserDTO userDTO, Long id);
    User findByEmail(String email);
    void userBan(Long id);
    //void changeUserRoles(Long id, Map<String, String> roles);
    User getUserByPrincipal(Principal principal);
}
