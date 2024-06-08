package nk.mframe.dto;

import lombok.*;
import nk.mframe.model.Role;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Component
public class RoleDTO {
    private String role;

    public static RoleDTO toRoleDto(Role role) {
        return RoleDTO.builder()
                .role(role.getRole())
                .build();
    }
}
