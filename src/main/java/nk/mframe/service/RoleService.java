package nk.mframe.service;

import nk.mframe.model.Role;

import java.util.List;

public interface RoleService {
    List<Role> getAllRoles();
    Role getRoleByName(String role);
    Role getRoleById(Integer id);
}
