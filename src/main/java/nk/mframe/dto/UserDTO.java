package nk.mframe.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import nk.mframe.model.Role;
import nk.mframe.model.User;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@NoArgsConstructor
@Data
@Builder
@AllArgsConstructor
public class UserDTO {
    private Long id;
    private String name;
    private String login;
    private String nickname;
    private String email;
    private String phoneNumber;
    private boolean active;
    private Set<RoleDTO> roles = new HashSet<>();
    private String password;
    private LocalDateTime dateOfCreated;

    public static UserDTO toUserDTO(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .nickname(user.getNickname())
                .login(user.getLogin())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .dateOfCreated(user.getDateOfCreated())
                .roles(user.getRoles().stream().map(Role::toRoleDto).collect(Collectors.toSet()))
                .build();
    }
}
