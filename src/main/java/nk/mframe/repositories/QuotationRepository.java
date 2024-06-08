package nk.mframe.repositories;

import nk.mframe.model.Quotation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuotationRepository extends JpaRepository<Quotation, Integer> {

//    @Query("select q from Quotation q where q.nameQuotation=:nameQuotation")
//    Quotation findQuotationByName(String nameQuotation);
    Quotation findQuotationById(Integer id);
}
