package nk.mframe.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import nk.mframe.dto.UserDTO;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Getter
@Setter
@Table(name = "user")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "email", unique = true)
    private String email;
    @Column(name = "login", unique = true)
    private String login;
    @Column(name = "nickname")
    private String nickname;
    @Column(name = "phoneNumber")
    private String phoneNumber;
    @Column(name = "name")
    private String name;
    @Column(name = "active")
    private boolean active;
    //    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
//    @JoinColumn(name = "image_id")
//    private Image avatar;
    @Column(name = "password", length = 1000)
    private String password;
//    @ElementCollection(targetClass = Role.class, fetch = FetchType.EAGER)
//    @CollectionTable(name = "user_role" ,
//            joinColumns = @JoinColumn(name = "user_id"))
//    @Enumerated(EnumType.STRING)
//    private Set<Role> roles = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    private Set<Role> roles = new HashSet<>();

    private LocalDateTime dateOfCreated;


//    public String roleToString() {
//        StringBuilder stringBuilder = new StringBuilder();
//        for (Role role : roles) {
//            stringBuilder.append(role.toString()).append(" ");
//        }
//        return stringBuilder.toString();
//    }

    @PrePersist
    private void init() {
        dateOfCreated = LocalDateTime.now();
    }

    public void addRole(Role role) {
        roles.add(role);
    }

    public List<String> getNameRoles() {
        return this.roles.stream().map(Role::getRole).map(x->x.substring(5)).collect(Collectors.toList());
    }

    public String getAllRolesWithOutBrackets (Set<Role> roles){
        return roles.stream().map(Role::getRole).map(x->x.substring(5)).collect(Collectors.joining(", "));
    }
    public UserDTO toUserDTO() {
        return UserDTO.toUserDTO(this);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return getRoles();
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return active;
    }
}
