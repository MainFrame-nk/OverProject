package nk.mframe.service;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import nk.mframe.model.Role;
import nk.mframe.repositories.RoleRepository;

import java.util.List;

@Service
public class RoleServiceImp implements RoleService {
    private final RoleRepository roleRepository;

    public RoleServiceImp(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public Role getRoleByName(String roleName) {
        return roleRepository.findByRole(roleName);
    }

    @Override
    public Role getRoleById(Integer id) {
        return roleRepository.findRoleById(id);
    }

    @Override
    @Transactional
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }
}
