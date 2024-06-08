package nk.mframe.dto;

import lombok.*;
import nk.mframe.model.Quotation;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Component
public class QuotationDTO {

    private Integer id;
    private String nameQuotation;

    public QuotationDTO(Integer id) {
        this.id = id;
    }

    public QuotationDTO(String id) {
        this.id = Integer.parseInt(id);
    }

    public static QuotationDTO toQuotationDto(Quotation quotation) {
        return QuotationDTO.builder()
                .id(quotation.getId())
                .nameQuotation(quotation.getNameQuotation())
                .build();
    }
}
