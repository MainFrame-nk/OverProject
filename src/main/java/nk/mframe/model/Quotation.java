package nk.mframe.model;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import nk.mframe.dto.QuotationDTO;

import jakarta.persistence.*;

@Entity
@Table(name = "quotes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Quotation implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "quotation_seq")
    @SequenceGenerator(name = "quotation_seq", sequenceName = "SEQ_QUOTES")
    private Integer id;

    private String nameQuotation;
    @Override
    public String getAuthority() {
        return nameQuotation;
    }

    public QuotationDTO toQuotationDto() {
        return QuotationDTO.toQuotationDto(this);
    }
}
